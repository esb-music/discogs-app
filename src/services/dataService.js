/**
 * @author Pavlo Rozbytskyi, Burkhardt Renz
 * dataService provides access to descriptions of discogs
 * descriptions are loaded into the service by setXXX
 */

export const dataService = (() => {

  let _discogs;
  let _desc;

  // Discogs
  let _setDiscogs = (discogs) => {_discogs = discogs}

  let _getNameByKey = (key) => {
    for (const element of _discogs) {
      if (element.key === key) { return element.name }
    }
    return null
  };

  let _getDiscogs = () => _discogs;

  // Desc
  let _setDesc = (desc) => {
    _desc = desc
    return true
  }

  // -- Albums
  let _getAlbums = () => _desc.albums

  let _getAlbumByTitle = (title) => {
    for (const album of _desc.albums) {
      if (album.title === title) { return album }
    }
    return null
  }

  let _getTracksOfAlbum = (albumTitle) => {
    for (const album of _desc.tracks) {
      if (album.title === albumTitle) { return album.tracks }
    }
    return null
  }

  // -- Musicians
  let _getMusicians = () => _desc.musicians

  let _getMusiciansByName = (name) => {
    for (const musician of _desc.musicians) {
      if (musician.name === name) { return musician }
    }
    return null
  }

  let _getAlbumsOnCriteria = (filterfn, predicatefn) => {
    // albums where performing musicians fullfill filterfn
    let albums1 = _desc.tracks.map((album) => {return {album: album.title,
      tracks: album.tracks.map((track) => {
        return {tno: track.tno, title: track.title,
          performing: track.performing.map((entry) => entry.name).filter(elem => filterfn(elem))
        }})}})

    // albums with the tracks where the number of performing musicians is according to predicatefn
    let albums2 = albums1.map((album) => {return {album: album.album,
      tracks: album.tracks.map((track) => {
        return {tno: track.tno, title: track.title,
          performing: predicatefn(track.performing.length)}})}})

    // albums with the tracks where performing is true
    let albums3 = albums2.map((album) => {return {album: album.album,
      tracks: album.tracks.filter((track) => track.performing)}})

    // return the albums with tracks
    return albums3.filter((album) => album.tracks.length > 0);
  }

  let _getAlbumsOfMusician = (name) => {
    let filterfn = (elem) => elem === name;
    let predicatefn = (length) => length === 1;
    return _getAlbumsOnCriteria(filterfn, predicatefn);
  }

  let _getPartnersOfMusician = (name) => {
    let performing = _desc.tracks.flatMap((album) => {
      return album.tracks.map((track) => {
        return track.performing.map((entry) => entry.name)
      })});
    let performingWith = performing.filter((entry) => {return entry.includes(name)});
    let allPartners = new Set(performingWith.flat());
    allPartners.delete(name);

    return Array.from(allPartners);
  }

  let _getAlbumsOfPartners = (name, partner) => {
    let filterfn = (elem) => elem === name || elem === partner;
    let predicatefn = (length) => length === 2;
    return _getAlbumsOnCriteria(filterfn, predicatefn);
  }

  return {
    setDiscogs: _setDiscogs,
    getNameByKey: _getNameByKey,
    getDiscogs: _getDiscogs,
    setDesc: _setDesc,
    getAlbums: _getAlbums,
    getAlbumByTitle: _getAlbumByTitle,
    getTracksOfAlbum: _getTracksOfAlbum,
    getMusicians: _getMusicians,
    getMusicianByName: _getMusiciansByName,
    getAlbumsOfMusician: _getAlbumsOfMusician,
    getPartnersOfMusician: _getPartnersOfMusician,
    getAlbumsOfPartners: _getAlbumsOfPartners
  };
})();