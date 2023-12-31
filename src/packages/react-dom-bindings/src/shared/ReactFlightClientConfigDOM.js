/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 *
 */

// This client file is in the shared folder because it applies to both SSR and browser contexts.
// It is the configuraiton of the FlightClient behavior which can run in either environment.

import ReactDOMSharedInternals from "shared/ReactDOMSharedInternals";
const ReactDOMCurrentDispatcher = ReactDOMSharedInternals.Dispatcher;

import { getCrossOriginString } from "./crossOriginStrings";

export function dispatchHint(code, model) {
  const dispatcher = ReactDOMCurrentDispatcher.current;
  if (dispatcher) {
    switch (code) {
      case "D": {
        const refined = refineModel(code, model);
        const href = refined;
        dispatcher.prefetchDNS(href);
        return;
      }
      case "C": {
        const refined = refineModel(code, model);
        if (typeof refined === "string") {
          const href = refined;
          dispatcher.preconnect(href);
        } else {
          const href = refined[0];
          const crossOrigin = refined[1];
          dispatcher.preconnect(href, crossOrigin);
        }
        return;
      }
      case "L": {
        const refined = refineModel(code, model);
        const href = refined[0];
        const as = refined[1];
        if (refined.length === 3) {
          const options = refined[2];
          dispatcher.preload(href, as, options);
        } else {
          dispatcher.preload(href, as);
        }
        return;
      }
      case "m": {
        const refined = refineModel(code, model);
        if (typeof refined === "string") {
          const href = refined;
          dispatcher.preloadModule(href);
        } else {
          const href = refined[0];
          const options = refined[1];
          dispatcher.preloadModule(href, options);
        }
        return;
      }
      case "S": {
        const refined = refineModel(code, model);
        if (typeof refined === "string") {
          const href = refined;
          dispatcher.preinitStyle(href);
        } else {
          const href = refined[0];
          const precedence = refined[1] === 0 ? undefined : refined[1];
          const options = refined.length === 3 ? refined[2] : undefined;
          dispatcher.preinitStyle(href, precedence, options);
        }
        return;
      }
      case "X": {
        const refined = refineModel(code, model);
        if (typeof refined === "string") {
          const href = refined;
          dispatcher.preinitScript(href);
        } else {
          const href = refined[0];
          const options = refined[1];
          dispatcher.preinitScript(href, options);
        }
        return;
      }
      case "M": {
        const refined = refineModel(code, model);
        if (typeof refined === "string") {
          const href = refined;
          dispatcher.preinitModuleScript(href);
        } else {
          const href = refined[0];
          const options = refined[1];
          dispatcher.preinitModuleScript(href, options);
        }
        return;
      }
    }
  }
}

// Flow is having troulbe refining the HintModels so we help it a bit.
// This should be compiled out in the production build.
function refineModel(code, model) {
  return model;
}

export function preinitModuleForSSR(href, nonce, crossOrigin) {
  const dispatcher = ReactDOMCurrentDispatcher.current;
  if (dispatcher) {
    dispatcher.preinitModuleScript(href, {
      crossOrigin: getCrossOriginString(crossOrigin),
      nonce,
    });
  }
}

export function preinitScriptForSSR(href, nonce, crossOrigin) {
  const dispatcher = ReactDOMCurrentDispatcher.current;
  if (dispatcher) {
    dispatcher.preinitScript(href, {
      crossOrigin: getCrossOriginString(crossOrigin),
      nonce,
    });
  }
}
