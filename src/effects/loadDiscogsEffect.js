/**
 * @author Burkhardt Renz
 * Effect to load the descriptions of discogs
 * from revision.json and discogs.json
 * If the remote revision is greater than the local revision
 * local storage is cleared and the files are loaded
 * from the folder data in public
 * otherwise data are fetched from local storage
 */

import {useState, useEffect} from "react";
import {localStore} from "../utils";

const loadDiscogs = () => {
  const revisionPath = "/data/revision.json";
  const discogsPath = "/data/discogs.json";

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  /*
  Fetching the current revision object
  needed to check whether the local storage is stale
   */
  const fetchRevisionObject = async () => {
    return (fetch(revisionPath).then((res) => res.json()))
  }

  const fetchDiscogs = async () => {
    try {

      // check whether the local storage must be cleared
      let remoteRevision = await fetchRevisionObject();
      console.log("remoteRevision: " + remoteRevision.rev);
      let localRevision = localStore.getItem("revision");
      if (!localRevision || localRevision.rev < remoteRevision.rev) {
        localStore.clear();
        localStore.setItem("revision", remoteRevision);
      }

      // fetch discogs from /data if not in local storage
      let localdata = localStore.getItem("discogs");
      if (!localdata) {
        console.log("fetching remote: " + discogsPath);
        const json = await fetch(discogsPath).then((res) => res.json());
        setData(json);
        setLoading(false);
        localStore.setItem("discogs", json);
      } else {
        console.log("loading local from key discogs");
        setData(localdata);
        setLoading(false);
      }
    } catch (err) {
      console.log(`Error fetching ${revisionPath} or ${discogsPath}`);
      console.log(err);
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchDiscogs();
  }, []);

  return [data, loading, error];
}

export {loadDiscogs};