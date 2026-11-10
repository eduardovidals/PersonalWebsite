/** Every word the demo shows or announces, already in the page's language. */
export interface PathPlateLabels {
  algorithm: string;
  legend: string;
  title: string;
  description: string;
  shortestRoute: string;
  finish: string;
  replay: string;
  searching: string;
  complete: string;
  /** Announced after a reduced-motion replay; `{{count}}` becomes the replay number. */
  replayNumber: string;
}

export interface PathPlateProps {
  labels: PathPlateLabels;
}
