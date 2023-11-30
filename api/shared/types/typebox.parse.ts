import type { TArray, TIntersect, TObject, TProperties } from '@sinclair/typebox';
import addFormats from 'ajv-formats';
import   Ajv from 'ajv';
import type { ValidateFunction } from 'ajv';
import { BadRequestError } from '../errors/babRequest';

const ajv = addFormats(new Ajv({}), [
  'date-time',
  'time',
  'date',
  'email',
  'hostname',
  'ipv4',
  'ipv6',
  'uri',
  'uri-reference',
  'uuid',
  'uri-template',
  'json-pointer',
  'relative-json-pointer',
  'regex'
]);

export function validatorFactory<T extends TProperties>(model: TObject<T> | TIntersect | TArray) {
  return ajv.compile(model);
}

export function parse<T>(validator: ValidateFunction, value: unknown) {
  if (!validator(value) && validator.errors) {
    const message = validator.errors
      .map((e) => {
        switch (e.keyword) {
          case 'const':
            return `${e.instancePath} ${e.message} ${e.params.allowedValue}`.trim();
          default:
            return `${e.instancePath} ${e.message}`.trim();
        }
      })
      .join(' | ');

    throw new BadRequestError(message);
  }
  return value as T;
}