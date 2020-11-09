import React, {
  PureComponent,
  ComponentType,
  PropsWithChildren
} from 'react';
import './with-active-flag';


interface WithActiveFlagState {
  isActive?: boolean | undefined;
}

const withActiveFlag = <P extends PropsWithChildren<WithActiveFlagState>>(
  Component: ComponentType<P>,
  status = false
) => {

  class WithActiveFlag extends PureComponent<P, WithActiveFlagState> {
    constructor(props: P) {
      super(props);

      this.state = {
        isActive: status,
      };

      this.handleActiveChange = this.handleActiveChange.bind(this);
    }

    private handleActiveChange() {
      this.setState((prevState) => ({ isActive: !prevState.isActive }));
    }

    render() {
      return <Component
        {...this.props}
        isActive={this.state.isActive}
        onActiveChange={this.handleActiveChange}
      />
    }
  }

  return WithActiveFlag;
};


export default withActiveFlag;
