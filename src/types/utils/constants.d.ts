/** Link type for the general use. */
interface Link {
  /** Required label of the anchor link. */
  label: string;
  /** The href of the link, do not add trailing slash for internal links. */
  link: string;
}
