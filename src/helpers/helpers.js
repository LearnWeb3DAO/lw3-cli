import { TRACKS } from "../constants/lw3";

export const getProjectsFromTrack = (trackName) => {
  return TRACKS.filter((track) => track.name == trackName)[0].projects;
};

export const getProjectGenerator = (track, project) => {
  const projects = getProjectsFromTrack(track);
  return projects.map((projectFromList) =>
    projectFromList.name === project ? projectFromList.gen : null
  )[0];
};
