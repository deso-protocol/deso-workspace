import Deso from 'deso-protocol';
import { Route } from 'react-router-dom';
import { ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
import { PageSection } from './PageSections';
const deso = new Deso();
export const metamaskChapter = {
  METAMASK_SIGN_IN: {
    parentRoute: ParentRoutes.metamask,
    title: 'Metamask sign in',
    route: '/metamask/signin',
    method: deso.metamask.generateSignature,
    githubSource: [],
    documentation: [],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.metamask.signin()',
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
