const debug = (props: { debug?: true }) => ({
  border: props.debug && "1px solid red!important",
});
export default debug;

// border-color: ${props => props.debug.color}!important;
// border-width: ${props => props.debug.width}!important;
// border-style: ${props => props.debug.style}!important;
