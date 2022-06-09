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

const deso = new Deso({ nodeUri: 'http://deso-seed-3.io:18501' });
export const referralChapter = {
  GET_REFERRAL_INFO_FOR_USER: {
    parentRoute: ParentRoutes.referral,
    title: 'Get Referral Info For User',
    route: '/referral/get-referral-info-for-user',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/referral-endpoints#get-referral-info-for-user',
    ],
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
      } as GetReferralInfoForUserRequest;
    },
    method: deso.referral.getReferralInfoForUser,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.referral.getReferralInfoForUser(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>
                  Gets all data about all referral codes for this owner,
                  including users referred by this code.
                </div>
              )}
              demo={true}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  GET_REFERRAL_INFO_FOR_REFERRAL_HASH: {
    parentRoute: ParentRoutes.referral,
    title: 'Get Referral Info For Referral Hash',
    route: '/referral/get-referral-info-for-referral-hash',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/referral-endpoints#get-referral-info-for-referral-hash',
    ],
    params: () => {
      return {
        ReferralHash: 'some referral hash',
      } as GetReferralInfoForReferralHashRequest;
    },
    method: deso.referral.getReferralInfoForReferralHash,
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              method={{
                methodName: `deso.referral.getReferralInfoForReferralHash(request)`,
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                CommonPageSectionTitles.OVERVIEW,
                <div>
                  Gets a summary of the current state of a single referral code.
                  This is useful when a user arrives at your site with a
                  referral code. It allows you to tell if the referral code is
                  still valid and how much the user would receive if they signed
                  up.
                </div>
              )}
              demo={false}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
};
