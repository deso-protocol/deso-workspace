import Deso from 'deso-protocol';
import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import { Metamask } from '../CustomChapters/Metamask';
import { CHAPTERS } from './Chapter.models';
const deso = new Deso();
export const metamaskChapter = {
  METAMASK_SIGN_IN: {
    parentRoute: ParentRoutes.metamask,
    title: 'Metamask sign in',
    route: '/metamask/signin',
    // method: deso.metamask.signInWithMetamaskNewUser,
    githubSource: [],
    documentation: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Metamask chapters={CHAPTERS} selectedChapter={this} />
            // <Page
            //   bind="metamask"
            //   demo={true}
            //   testnet={true}
            //   method={{
            //     methodName: 'deso.metamask.signInWithMetamaskNewUser()',
            //     params: () => null,
            //     method: this.method,
            //   }}
            //   pretext={PageSection(
            //     this.title,
            //     <div>sign in with metamask</div>
            //   )}
            //   chapters={CHAPTERS}
            //   selectedChapter={this}
            // />
          }
        ></Route>
      );
    },
  },
};
