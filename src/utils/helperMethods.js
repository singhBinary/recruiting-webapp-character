export const modifier = (points) => Math.floor((points - 10) / 2);

export const skillPoints = (intelligence) => 10 + 4 * modifier(intelligence);
