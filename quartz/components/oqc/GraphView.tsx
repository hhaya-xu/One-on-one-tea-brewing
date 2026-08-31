import Graph from "../Graph";
import {
  QuartzComponent,
  QuartzComponentConstructor,
  QuartzComponentProps,
} from "../types";
// Show the complete knowledge-base graph in the site view instead of the
// default one-hop page neighbourhood.
const NativeGraph = Graph({ localGraph: { depth: -1 } });
const GraphView: QuartzComponent = (props: QuartzComponentProps) => {
  return (
    <section class="oqc-graph">
      <NativeGraph {...props} />
    </section>
  );
};
GraphView.css = NativeGraph.css;
GraphView.afterDOMLoaded = NativeGraph.afterDOMLoaded;
export default (() => GraphView) satisfies QuartzComponentConstructor;
