let cache: Blob | null = null;

const get = () => cache;

const set = (blob: Blob) => {
  cache = blob;
};

const submitChallengeCache = {
  get,
  set,
};

export default submitChallengeCache;
