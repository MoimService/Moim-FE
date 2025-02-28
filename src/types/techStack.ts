import { IconConfig } from '@/components/ui/Icon/IconData';
import React from 'react';

// 클릭된 버튼 상태를 위한 타입
export type ClickedButtonsState = {
  [key: string]: boolean;
};

// 아이콘 컴포넌트를 위한 타입
export type IconComponent = React.ComponentType<{
  size?: number;
  color?: string;
  className?: string;
}>;

// 아이콘 정보를 위한 타입 (getActiveIcons에서 반환되는 객체)
export interface IconWithComponent extends IconConfig {
  component: IconComponent;
}

// 기술스택 카테고리 타입
export type CategoryType = IconConfig['category'] | 'all';
