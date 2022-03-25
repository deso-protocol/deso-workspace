import { Route } from 'react-router-dom';
import { CHAPTERS } from './Chapter.models';
import { DEZO_DOG, ParentRoutes } from '../../services/utils';
import Deso from 'deso-protocol';
import {
  GetBlockTemplateRequest,
  SubmitBlockRequest,
} from 'deso-protocol-types';
import Page from '../Read/Page';
import { PageSection } from './PageSections';
const deso = new Deso();
export const minerChapter = {
  GET_BLOCK_TEMPLATE: {
    parentRoute: ParentRoutes.miner,
    title: 'Get Block Template',
    route: '/miner/get-block-template',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/miner-endpoints#get-block-template',
    ],

    method: deso.miner.getBlockTemplate,
    params: () => {
      return {
        PublicKeyBase58Check: DEZO_DOG,
        NumHeaders: 1,
        HeaderVersion: 1,
      } as GetBlockTemplateRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={true}
              method={{
                methodName: 'deso.miner.getBlockTemplate(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>Get the template for the next block</div>
              )}
              chapters={CHAPTERS}
              selectedChapter={this}
            />
          }
        ></Route>
      );
    },
  },
  SUBMIT_BLOCK: {
    parentRoute: ParentRoutes.miner,
    title: 'Submit Block',
    route: '/miner/submit-block',
    githubSource: [],
    documentation: [
      'https://docs.deso.org/for-developers/backend/blockchain-data/api/miner-endpoints#submit-block',
    ],
    method: deso.miner.submitBlock,
    params: () => {
      return {
        BlockID: '1',
        ExtraData: 2,
        Header: ['not a real byte array'],
        PublicKeyBase58Check: localStorage.getItem('login_key') as string,
      } as SubmitBlockRequest;
    },
    component: function () {
      return (
        <Route
          key={this.title}
          path={this.route}
          element={
            <Page
              demo={false}
              method={{
                methodName: 'deso.miner.submitBlock(request)',
                params: this.params,
                method: this.method,
              }}
              pretext={PageSection(
                this.title,
                <div>
                  Submits block to be processed by node's block producer
                </div>
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
