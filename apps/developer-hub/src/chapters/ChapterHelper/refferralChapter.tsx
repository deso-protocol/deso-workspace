import Deso from 'deso-protocol';
import {
  GetReferralInfoForReferralHashRequest,
  GetReferralInfoForUserRequest,
} from 'deso-protocol-types';
import { Route } from 'react-router-dom';
import { DEZO_DOG, ParentRoutes } from '../../services/utils';
import Page from '../Read/Page';
import { CHAPTERS } from './Chapter.models';
import { CommonPageSectionTitles, PageSection } from './PageSections';

const deso = new Deso();
export const referralChapter = {
  // GET_REFERRAL_INFO_FOR_USER: {
  //   parentRoute: ParentRoutes.referral,
  //   title: 'Get Referral Info For User',
  //   route: '/referral/get-referral-info-for-user',
  //   githubSource: [],
  //   documentation: [
  //     'https://docs.deso.org/for-developers/backend/blockchain-data/api/referral-endpoints',
  //   ],
  //   params: {
  //     PublicKeyBase58Check: DEZO_DOG,
  //     JWT: 'jwt',
  //   } as GetReferralInfoForUserRequest,
  //   method: deso.referral.getReferralInfoForUser,
  //   component: function () {
  //     return (
  //       <Route
  //         key={this.title}
  //         path={this.route}
  //         element={
  //           <Page
  //             method={{
  //               methodName: `deso.referral.getReferralInfoForUser(request)`,
  //               params: this.params,
  //               method: this.method,
  //             }}
  //             pretext={PageSection(
  //               CommonPageSectionTitles.OVERVIEW,
  //               <div>
  //                 Similar to the get-users-stateless, but Instead it will return
  //                 an array of followers for a specific account.{' '}
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
  // GET_REFERRAL_INFO_FOR_REFERRAL_HASH: {
  //   parentRoute: ParentRoutes.referral,
  //   title: 'Get Referral Info For Referral Hash',
  //   route: '/referral/get-referral-info-for-referral-hash',
  //   githubSource: [],
  //   documentation: [
  //     'https://docs.deso.org/for-developers/backend/blockchain-data/api/referral-endpoints#get-referral-info-for-referral-hash',
  //   ],
  //   params: {} as GetReferralInfoForReferralHashRequest,
  //   method: deso.referral.getReferralInfoForReferralHash,
  //   // component: function () {
  //   //   return (
  //   //     <Route
  //   //       key={this.title}
  //   //       path={this.route}
  //   //       element={
  //   //         <Page
  //   //           method={{
  //   //             methodName: `deso.referral.getReferralInfoForReferralHash(request)`,
  //   //             params: this.params,
  //   //             method: this.method,
  //   //           }}
  //   //           pretext={PageSection(
  //   //             CommonPageSectionTitles.OVERVIEW,
  //   //             <div>
  //   //               Similar to the get-users-stateless, but Instead it will return
  //   //               an array of followers for a specific account.{' '}
  //   //             </div>
  //   //           )}
  //   //           tabs={[]}
  //   //           chapters={CHAPTERS}
  //   //           selectedChapter={this}
  //   //         />
  //   //       }
  //   //     ></Route>
  //   //   );
  //   // },
  // },
};
