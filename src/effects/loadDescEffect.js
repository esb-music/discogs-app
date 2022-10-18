import {useEffect, useState} from "react";
import {localStore} from "../utils";

export function loadDesc(key) {
  const [desc, setDesc] = useState({albums: [], tracks: [], musicians: []});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  async function fetchFile(url) {
    try {
      return await fetch(url).then((res) => res.json());
    } catch (err) {
      console.log(`Error fetching ${url}`);
      console.log(err);
      throw new Error(err.message);
    }
  }

  async function fetchDesc() {
    try {
      let desc = {};
      let localKey = localStore.getItem("key");
      if (!localKey || localKey !== key) {
        // Fetch desc from /data
        const files = ["albums", "tracks", "musicians"];
        let promises;
        let result;

        promises = files.map((file) => fetchFile(`/data/${key}/${file}.json`))
        result = await Promise.all(promises);
        for (let i = 0; i < 3; i++) {
          desc[files[i]] = result[i]
        }
        localStore.setItem("key", key);
        localStore.setItem("desc", desc);
      } else {
        desc = localStore.getItem("desc");
      }
      setDesc(desc);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      setError(true);
    }
  }

  useEffect(() => {
    fetchDesc()
  }, []);

  return [desc, loading, error];
}
