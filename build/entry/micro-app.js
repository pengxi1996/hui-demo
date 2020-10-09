import Vue from "vue";
import singleSpaVue from "./singleSpaVue";
import { appOptions } from "@common/entry";

export const { bootstrap, mount, unmount } = singleSpaVue({ Vue, appOptions });
