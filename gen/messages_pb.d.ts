// package: christiangeorgelucas.semver_tools
// file: messages.proto

import * as jspb from "google-protobuf";

export class SemverParseRequest extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverParseRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverParseRequest): SemverParseRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverParseRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverParseRequest;
  static deserializeBinaryFromReader(message: SemverParseRequest, reader: jspb.BinaryReader): SemverParseRequest;
}

export namespace SemverParseRequest {
  export type AsObject = {
    version: string,
    loose: boolean,
  }
}

export class SemverCleanRequest extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverCleanRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverCleanRequest): SemverCleanRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverCleanRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverCleanRequest;
  static deserializeBinaryFromReader(message: SemverCleanRequest, reader: jspb.BinaryReader): SemverCleanRequest;
}

export namespace SemverCleanRequest {
  export type AsObject = {
    version: string,
    loose: boolean,
  }
}

export class SemverCoerceRequest extends jspb.Message {
  getText(): string;
  setText(value: string): void;

  getIncludePrerelease(): boolean;
  setIncludePrerelease(value: boolean): void;

  getRightToLeft(): boolean;
  setRightToLeft(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverCoerceRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverCoerceRequest): SemverCoerceRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverCoerceRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverCoerceRequest;
  static deserializeBinaryFromReader(message: SemverCoerceRequest, reader: jspb.BinaryReader): SemverCoerceRequest;
}

export namespace SemverCoerceRequest {
  export type AsObject = {
    text: string,
    includePrerelease: boolean,
    rightToLeft: boolean,
  }
}

export class SemverVersionPairRequest extends jspb.Message {
  getVersion1(): string;
  setVersion1(value: string): void;

  getVersion2(): string;
  setVersion2(value: string): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  getConsiderBuild(): boolean;
  setConsiderBuild(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverVersionPairRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverVersionPairRequest): SemverVersionPairRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverVersionPairRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverVersionPairRequest;
  static deserializeBinaryFromReader(message: SemverVersionPairRequest, reader: jspb.BinaryReader): SemverVersionPairRequest;
}

export namespace SemverVersionPairRequest {
  export type AsObject = {
    version1: string,
    version2: string,
    loose: boolean,
    considerBuild: boolean,
  }
}

export class SemverIncrementRequest extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): void;

  getReleaseType(): string;
  setReleaseType(value: string): void;

  getIdentifier(): string;
  setIdentifier(value: string): void;

  getIdentifierBase(): string;
  setIdentifierBase(value: string): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverIncrementRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverIncrementRequest): SemverIncrementRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverIncrementRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverIncrementRequest;
  static deserializeBinaryFromReader(message: SemverIncrementRequest, reader: jspb.BinaryReader): SemverIncrementRequest;
}

export namespace SemverIncrementRequest {
  export type AsObject = {
    version: string,
    releaseType: string,
    identifier: string,
    identifierBase: string,
    loose: boolean,
  }
}

export class SemverTruncateRequest extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): void;

  getTruncation(): string;
  setTruncation(value: string): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverTruncateRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverTruncateRequest): SemverTruncateRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverTruncateRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverTruncateRequest;
  static deserializeBinaryFromReader(message: SemverTruncateRequest, reader: jspb.BinaryReader): SemverTruncateRequest;
}

export namespace SemverTruncateRequest {
  export type AsObject = {
    version: string,
    truncation: string,
    loose: boolean,
  }
}

export class SemverRangeRequest extends jspb.Message {
  getRange(): string;
  setRange(value: string): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  getIncludePrerelease(): boolean;
  setIncludePrerelease(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverRangeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverRangeRequest): SemverRangeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverRangeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverRangeRequest;
  static deserializeBinaryFromReader(message: SemverRangeRequest, reader: jspb.BinaryReader): SemverRangeRequest;
}

export namespace SemverRangeRequest {
  export type AsObject = {
    range: string,
    loose: boolean,
    includePrerelease: boolean,
  }
}

export class SemverSatisfiesRequest extends jspb.Message {
  getVersion(): string;
  setVersion(value: string): void;

  getRange(): string;
  setRange(value: string): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  getIncludePrerelease(): boolean;
  setIncludePrerelease(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverSatisfiesRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverSatisfiesRequest): SemverSatisfiesRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverSatisfiesRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverSatisfiesRequest;
  static deserializeBinaryFromReader(message: SemverSatisfiesRequest, reader: jspb.BinaryReader): SemverSatisfiesRequest;
}

export namespace SemverSatisfiesRequest {
  export type AsObject = {
    version: string,
    range: string,
    loose: boolean,
    includePrerelease: boolean,
  }
}

export class SemverListRangeRequest extends jspb.Message {
  clearVersionsList(): void;
  getVersionsList(): Array<string>;
  setVersionsList(value: Array<string>): void;
  addVersions(value: string, index?: number): string;

  getRange(): string;
  setRange(value: string): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  getIncludePrerelease(): boolean;
  setIncludePrerelease(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverListRangeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverListRangeRequest): SemverListRangeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverListRangeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverListRangeRequest;
  static deserializeBinaryFromReader(message: SemverListRangeRequest, reader: jspb.BinaryReader): SemverListRangeRequest;
}

export namespace SemverListRangeRequest {
  export type AsObject = {
    versionsList: Array<string>,
    range: string,
    loose: boolean,
    includePrerelease: boolean,
  }
}

export class SemverSortRequest extends jspb.Message {
  clearVersionsList(): void;
  getVersionsList(): Array<string>;
  setVersionsList(value: Array<string>): void;
  addVersions(value: string, index?: number): string;

  getDescending(): boolean;
  setDescending(value: boolean): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverSortRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverSortRequest): SemverSortRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverSortRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverSortRequest;
  static deserializeBinaryFromReader(message: SemverSortRequest, reader: jspb.BinaryReader): SemverSortRequest;
}

export namespace SemverSortRequest {
  export type AsObject = {
    versionsList: Array<string>,
    descending: boolean,
    loose: boolean,
  }
}

export class SemverTwoRangeRequest extends jspb.Message {
  getRange1(): string;
  setRange1(value: string): void;

  getRange2(): string;
  setRange2(value: string): void;

  getLoose(): boolean;
  setLoose(value: boolean): void;

  getIncludePrerelease(): boolean;
  setIncludePrerelease(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverTwoRangeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: SemverTwoRangeRequest): SemverTwoRangeRequest.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverTwoRangeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverTwoRangeRequest;
  static deserializeBinaryFromReader(message: SemverTwoRangeRequest, reader: jspb.BinaryReader): SemverTwoRangeRequest;
}

export namespace SemverTwoRangeRequest {
  export type AsObject = {
    range1: string,
    range2: string,
    loose: boolean,
    includePrerelease: boolean,
  }
}

export class SemverVersion extends jspb.Message {
  getValid(): boolean;
  setValid(value: boolean): void;

  getVersion(): string;
  setVersion(value: string): void;

  getMajor(): number;
  setMajor(value: number): void;

  getMinor(): number;
  setMinor(value: number): void;

  getPatch(): number;
  setPatch(value: number): void;

  clearPrereleaseList(): void;
  getPrereleaseList(): Array<string>;
  setPrereleaseList(value: Array<string>): void;
  addPrerelease(value: string, index?: number): string;

  clearBuildList(): void;
  getBuildList(): Array<string>;
  setBuildList(value: Array<string>): void;
  addBuild(value: string, index?: number): string;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverVersion.AsObject;
  static toObject(includeInstance: boolean, msg: SemverVersion): SemverVersion.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverVersion, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverVersion;
  static deserializeBinaryFromReader(message: SemverVersion, reader: jspb.BinaryReader): SemverVersion;
}

export namespace SemverVersion {
  export type AsObject = {
    valid: boolean,
    version: string,
    major: number,
    minor: number,
    patch: number,
    prereleaseList: Array<string>,
    buildList: Array<string>,
    error: string,
  }
}

export class SemverVersionResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getVersion(): string;
  setVersion(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverVersionResult.AsObject;
  static toObject(includeInstance: boolean, msg: SemverVersionResult): SemverVersionResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverVersionResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverVersionResult;
  static deserializeBinaryFromReader(message: SemverVersionResult, reader: jspb.BinaryReader): SemverVersionResult;
}

export namespace SemverVersionResult {
  export type AsObject = {
    ok: boolean,
    version: string,
    error: string,
  }
}

export class SemverRangeResult extends jspb.Message {
  getOk(): boolean;
  setOk(value: boolean): void;

  getRange(): string;
  setRange(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverRangeResult.AsObject;
  static toObject(includeInstance: boolean, msg: SemverRangeResult): SemverRangeResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverRangeResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverRangeResult;
  static deserializeBinaryFromReader(message: SemverRangeResult, reader: jspb.BinaryReader): SemverRangeResult;
}

export namespace SemverRangeResult {
  export type AsObject = {
    ok: boolean,
    range: string,
    error: string,
  }
}

export class SemverCompareResult extends jspb.Message {
  getComparison(): number;
  setComparison(value: number): void;

  getRelation(): string;
  setRelation(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverCompareResult.AsObject;
  static toObject(includeInstance: boolean, msg: SemverCompareResult): SemverCompareResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverCompareResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverCompareResult;
  static deserializeBinaryFromReader(message: SemverCompareResult, reader: jspb.BinaryReader): SemverCompareResult;
}

export namespace SemverCompareResult {
  export type AsObject = {
    comparison: number,
    relation: string,
    error: string,
  }
}

export class SemverDiffResult extends jspb.Message {
  getEqual(): boolean;
  setEqual(value: boolean): void;

  getReleaseType(): string;
  setReleaseType(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverDiffResult.AsObject;
  static toObject(includeInstance: boolean, msg: SemverDiffResult): SemverDiffResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverDiffResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverDiffResult;
  static deserializeBinaryFromReader(message: SemverDiffResult, reader: jspb.BinaryReader): SemverDiffResult;
}

export namespace SemverDiffResult {
  export type AsObject = {
    equal: boolean,
    releaseType: string,
    error: string,
  }
}

export class SemverSatisfiesResult extends jspb.Message {
  getSatisfies(): boolean;
  setSatisfies(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverSatisfiesResult.AsObject;
  static toObject(includeInstance: boolean, msg: SemverSatisfiesResult): SemverSatisfiesResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverSatisfiesResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverSatisfiesResult;
  static deserializeBinaryFromReader(message: SemverSatisfiesResult, reader: jspb.BinaryReader): SemverSatisfiesResult;
}

export namespace SemverSatisfiesResult {
  export type AsObject = {
    satisfies: boolean,
    error: string,
  }
}

export class SemverSortResult extends jspb.Message {
  clearVersionsList(): void;
  getVersionsList(): Array<string>;
  setVersionsList(value: Array<string>): void;
  addVersions(value: string, index?: number): string;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverSortResult.AsObject;
  static toObject(includeInstance: boolean, msg: SemverSortResult): SemverSortResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverSortResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverSortResult;
  static deserializeBinaryFromReader(message: SemverSortResult, reader: jspb.BinaryReader): SemverSortResult;
}

export namespace SemverSortResult {
  export type AsObject = {
    versionsList: Array<string>,
    error: string,
  }
}

export class SemverRangePositionResult extends jspb.Message {
  getPosition(): string;
  setPosition(value: string): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverRangePositionResult.AsObject;
  static toObject(includeInstance: boolean, msg: SemverRangePositionResult): SemverRangePositionResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverRangePositionResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverRangePositionResult;
  static deserializeBinaryFromReader(message: SemverRangePositionResult, reader: jspb.BinaryReader): SemverRangePositionResult;
}

export namespace SemverRangePositionResult {
  export type AsObject = {
    position: string,
    error: string,
  }
}

export class SemverBoolResult extends jspb.Message {
  getResult(): boolean;
  setResult(value: boolean): void;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverBoolResult.AsObject;
  static toObject(includeInstance: boolean, msg: SemverBoolResult): SemverBoolResult.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverBoolResult, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverBoolResult;
  static deserializeBinaryFromReader(message: SemverBoolResult, reader: jspb.BinaryReader): SemverBoolResult;
}

export namespace SemverBoolResult {
  export type AsObject = {
    result: boolean,
    error: string,
  }
}

export class SemverComparatorSet extends jspb.Message {
  clearComparatorsList(): void;
  getComparatorsList(): Array<string>;
  setComparatorsList(value: Array<string>): void;
  addComparators(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverComparatorSet.AsObject;
  static toObject(includeInstance: boolean, msg: SemverComparatorSet): SemverComparatorSet.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverComparatorSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverComparatorSet;
  static deserializeBinaryFromReader(message: SemverComparatorSet, reader: jspb.BinaryReader): SemverComparatorSet;
}

export namespace SemverComparatorSet {
  export type AsObject = {
    comparatorsList: Array<string>,
  }
}

export class SemverComparatorSets extends jspb.Message {
  clearSetsList(): void;
  getSetsList(): Array<SemverComparatorSet>;
  setSetsList(value: Array<SemverComparatorSet>): void;
  addSets(value?: SemverComparatorSet, index?: number): SemverComparatorSet;

  getError(): string;
  setError(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SemverComparatorSets.AsObject;
  static toObject(includeInstance: boolean, msg: SemverComparatorSets): SemverComparatorSets.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: SemverComparatorSets, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SemverComparatorSets;
  static deserializeBinaryFromReader(message: SemverComparatorSets, reader: jspb.BinaryReader): SemverComparatorSets;
}

export namespace SemverComparatorSets {
  export type AsObject = {
    setsList: Array<SemverComparatorSet.AsObject>,
    error: string,
  }
}

