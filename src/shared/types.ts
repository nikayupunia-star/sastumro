import type { ComponentType } from 'react';
import type { ReducersMapObject } from '@reduxjs/toolkit';

/** ყველა საიტი (module) ამ ფორმით ეცხადება საერთო აპს. */
export interface SiteModule {
  id: string;
  title: string;
  description: string;
  emoji: string;
  /** URL-ის პრეფიქსი, მაგ. "/aurora" */
  path: string;
  /** Redux reducer-ები (key-ები უნიკალური უნდა იყოს მოდულებს შორის) */
  reducers: ReducersMapObject;
  Component: ComponentType;
}
