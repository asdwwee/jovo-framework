import { App, ExtensibleConfig, Jovo, Platform } from 'jovo-core';
import { AlexaOutputConverterStrategy, AlexaResponse } from 'jovo-output-alexa';
import { AlexaRequest } from './AlexaRequest';
import { AlexaSkill } from './AlexaSkill';

export interface AlexaConfig extends ExtensibleConfig {}

export class Alexa extends Platform<AlexaRequest, AlexaResponse, AlexaConfig> {
  outputConverterStrategy = new AlexaOutputConverterStrategy();
  requestClass = AlexaRequest;
  jovoClass = AlexaSkill;

  getDefaultConfig() {
    return {};
  }

  mount(parent: App): Promise<void> | void {}

  isRequestRelated(request: Record<string, any>): boolean {
    return request.version && request.request && request.request.requestId;
  }

  setResponseSessionData(response: AlexaResponse, jovo: Jovo): this {
    response.sessionAttributes = jovo.$session.$data;
    return this;
  }
}
