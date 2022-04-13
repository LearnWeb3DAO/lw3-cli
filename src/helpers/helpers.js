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

export const toPascalCase = (value) =>{
  return `${value}`
    .replace(new RegExp(/[-_]+/, 'g'), ' ')
    .replace(new RegExp(/[^\w\s]/, 'g'), '')
    .replace(
      new RegExp(/\s+(.)(\w*)/, 'g'),
      ($1, $2, $3) => `${$2.toUpperCase() + $3.toLowerCase()}`
    )
    .replace(new RegExp(/\w/), s => s.toUpperCase());
}