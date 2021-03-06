import * as React from "react";
import * as PropTypes from "prop-types";

export interface DataProps {}

export interface MockProps extends DataProps, React.HTMLAttributes<HTMLDivElement> {}

export interface MockState {}

export default class Mock extends React.Component<MockProps, MockState> {
  static defaultProps: MockProps = {};

  state: MockState = {};

  static contextTypes = { theme: PropTypes.object };
  context: { theme: ReactUWP.ThemeType };

  render() {
    const {
      ...attributes
    } = this.props;
    const { theme } = this.context;
    const styles = getStyles(this);

    return (
      <div
        {...attributes}
        style={styles.root}
      >
        Mock
      </div>
    );
  }
}

function getStyles(mock: Mock): {
  root?: React.CSSProperties;
} {
  const {
    context: { theme },
    props: { style }
  } = mock;
  const { prefixStyle } = theme;

  return {
    root: prefixStyle({
      ...style
    })
  };
}
