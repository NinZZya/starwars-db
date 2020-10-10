import React, { PureComponent, ComponentType, PropsWithChildren } from 'react';


interface S {
  isActive?: boolean | undefined;
}

const withActiveFlag = <P extends PropsWithChildren<S> >(Component: ComponentType<P>, status = false) => {

  class WithActiveFlag extends PureComponent<P, S> {
    constructor(props: P) {
      super(props);

      this.state = {
        isActive: status,
      };

      this._handleActiveChange = this._handleActiveChange.bind(this);
    }

    _handleActiveChange() {
      this.setState((prevState) => ({ isActive: !prevState.isActive }));
    }

    render() {
      return <Component
        {...this.props}
        isActive={this.state.isActive}
        onActiveChange={this._handleActiveChange}
      />
    }
  }

  return WithActiveFlag;
};


export default withActiveFlag;
