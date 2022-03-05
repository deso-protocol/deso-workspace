import { Route } from 'react-router-dom';
import { IdentityLoginPage } from '../Identity/identity-login/IdentitiyLoginPage';
import { IdentityLogoutPage } from '../Identity/identity-logout/IdentityLogoutPage';
import { CHAPTERS } from './Chapter.models';
import { ParentRoutes } from '../../services/utils';

export const identityChapter = {
  IDENTITY_LOGIN: {
    parentRoute: ParentRoutes.identity,
    title: 'Login',
    route: '/identity/identity-login',
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-login/IdentityLogin.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-initialize/GetIdentityFrame.tsx',
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Interfaces/User.tsx',
    ],
    documentation: [
      'https://docs.deso.org/identity/window-api/endpoints#log-in',
      'https://docs.deso.org/identity/identity',
    ],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <IdentityLoginPage chapters={CHAPTERS} selectedChapter={this} />
          }
        ></Route>
      );
    },
  },
  IDENTITY_LOGOUT: {
    parentRoute: ParentRoutes.identity,
    title: 'Logout',
    route: '/identity/identity-logout',
    githubSource: [
      'https://raw.githubusercontent.com/DeSoDog/deso-deep-dive/master/src/chapters/Identity/identity-logout/IdentityLogout.service.tsx',
    ],
    documentation: ['https://docs.deso.org/identity/window-api/endpoints'],
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <IdentityLogoutPage chapters={CHAPTERS} selectedChapter={this} />
          }
        ></Route>
      );
    },
  },
};
// IDENTITY_APPROVE: {
//   title: 'Approve',
//   route: '/identity/identity-approve',
//   githubSource: [],
//   documentation: [
//     'https://docs.deso.org/identity/window-api/endpoints#approve',
//     'https://docs.deso.org/identity/identity',
//   ],
//   component: function () {
//     return (
//       <Route
//         key={this.title}
//         path={this.route}
//         element={
//           <Chapter1Section
//             pretext={PageSection(
//               CommonPageSectionTitles.OVERVIEW,
//               <div>
//                 If a user is not logged in or they do not have the proper
//                 permissional level approval is needed
//               </div>
//             )}
//             tabs={[]}
//             chapters={CHAPTERS}
//             selectedChapter={this}
//           />
//         }
//       ></Route>
//     );
//   },
// },
