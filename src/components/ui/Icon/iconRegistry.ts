import { convertComponentName } from '@/util/getIconDetail';
import { createElement } from 'react';

import { BaseIcon, BaseIconProps } from './BaseIcon';
import { ICON_LIST, IconConfig } from './IconData';

type IconProps = Omit<BaseIconProps, 'path'>;

function createIconComponent(config: IconConfig) {
  return function Icon(props: IconProps) {
    return createElement(BaseIcon, {
      ...props,
      color: props.color ?? config.color,
      path: config.path,
      title: `${config.name} Icon`,
      ariaLabel: config.name,
    });
  };
}

// 카테고리별로 아이콘 분류 및 컴포넌트 생성
export const Icons = ICON_LIST.reduce<
  Record<string, Record<string, (props: IconProps) => JSX.Element>>
>((acc, config) => {
  const category = config.category;
  const componentName = `${convertComponentName(config.name)}Icon`;

  if (!acc[category]) {
    acc[category] = {};
  }

  acc[category][componentName] = createIconComponent(config);
  return acc;
}, {});

// 카테고리별 export
export const { frontend, backend, design } = Icons;

// 모든 아이콘 한번에 export
export const AllIcons = Object.values(Icons).reduce<
  Record<string, (props: IconProps) => JSX.Element>
>(
  (acc, categoryIcons) => ({
    ...acc,
    ...categoryIcons,
  }),
  {},
);
