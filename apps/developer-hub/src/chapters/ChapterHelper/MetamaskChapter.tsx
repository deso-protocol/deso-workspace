import Deso from 'deso-protocol';
import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';
const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
export const metamaskChapter = {
  METAMASK_SIGN_IN: {
    parentRoute: ParentRoutes.metamask,
    title: 'Metamask sign in',
    route: '/metamask/signin',
    method: deso.metamask.signInWithMetamaskNewUser,
    githubSource: [],
    documentation: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              bind="metamask"
              demo={true}
              testnet={true}
              method={{
                methodName: 'deso.metamask.signInWithMetamaskNewUser()',
                params: () => null,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>sign in with metamask</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
};
