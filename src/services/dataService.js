/**
 * @author Pavlo Rozbytskyi, Burkhardt Renz
 * dataService provides access to descriptions of discogs
 * descriptions are loaded into the service by setXXX
 */

export const dataService = ((() => {

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
    console.log("setDesc")
    console.log(desc)
    _desc = desc
    return true
  }

  // -- Albums
  let _getAlbums = () => _desc.albums

  let _getAlbumByTitle = (title) => {
    console.log(title)
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

  let _getAlbumsOfMusician = (name) => {
    // replace performing by boolean indicating the musician performing on the track
    let albums1 = _desc.tracks.map((album) => {return {album: album.title,
      tracks: album.tracks.map((track) => {
        return {tno: track.tno, title: track.title,
          performing: track.performing.map((entry) => entry.name).includes(name)
        }})}})

    // albums with the tracks where the musician performs
    let albums2 = albums1.map((album) => {return {album: album.album,
      tracks: album.tracks.filter((track) => track.performing)}})

    // just the albums with nonempty tracks
    return albums2.filter((album) => album.tracks.length > 0);
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
    getAlbumsOfMusician: _getAlbumsOfMusician
  };
})());