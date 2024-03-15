export interface ISubHeadings {
  nodes: NodeListOf<HTMLHeadingElement>;
  color: string;
}

export interface IHeadings {
  h1: ISubHeadings;
  h2: ISubHeadings;
  h3: ISubHeadings;
  h4: ISubHeadings;
  h5: ISubHeadings;
  h6: ISubHeadings;
}
