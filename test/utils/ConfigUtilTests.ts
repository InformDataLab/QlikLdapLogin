import {describe, it} from "mocha";
import {expect} from "chai";
import {ConfigUtil} from "../../src/utils/ConfigUtil";
import {QlikLdapLoginServiceHelper} from "../helper/QlikSenseLoginServiceHelper";
import nconf from "nconf";

describe("utils", () => {
    describe("ConfigUtils", () => {
        before(() => {
            ConfigUtil.setup();
        });
        describe("getQpsUri()", () => {
            it("should return the default QPS URI", () => {
                expect(ConfigUtil.getQpsUri()).to.equal(
                    "https://qlikserver.example.org:4243/qps/customVirtualProxyPrefix",
                );
            });
        });
        describe("getClientPfx()", () => {
            it("should not find the client.pfx", () => {
                try {
                    ConfigUtil.getClientPfx();
                    throw new Error("should not find the client.pfx");
                } catch (err) {
                    if (!(err instanceof Error)) {
                        throw new Error("Error has wrong instance");
                    }
                    // eslint-disable-next-line no-unused-expressions
                    expect(err.message.startsWith("Could not find the certificate")).to.be.true;
                }
            });
        });
        describe("getServerPort", () => {
            it("should get port from env var", () => {
                nconf.set("SERVER_PORT", "12345");
                expect(ConfigUtil.getServerPort()).to.be.equal(12345);
            });
            it("should return default port on undefined env var", () => {
                nconf.set("SERVER_PORT", undefined);
                expect(ConfigUtil.getServerPort()).to.be.equal(QlikLdapLoginServiceHelper.defaultServicePort);
            });
            it("should return default port on NaN env var", () => {
                nconf.set("SERVER_PORT", "test");
                expect(ConfigUtil.getServerPort()).to.be.equal(QlikLdapLoginServiceHelper.defaultServicePort);
            });
        });
    });
});
