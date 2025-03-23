import { ICON_LIST } from '@/components/ui/Icon/IconData';
import {
  AllIcons,
  backend,
  design,
  frontend,
} from '@/components/ui/Icon/iconRegistry';
import { CategoryType, IconComponent } from 'type-clyde/common/icon/techStacks';
import { IconWithComponent } from 'type-clyde/common/icon/techStacks';

// 컴포넌트 이름 카멜케이스로 변경
export function convertComponentName(name: string) {
  return name
    .replace(/[\s.-]+(.)/g, (_, c) => c.toUpperCase())
    .replace(/[\s.-]/g, '');
}

// 선택된 아이콘의 색상 가져오기
export const getIconColor = (iconName: string): string => {
  const icon = ICON_LIST.find((icon) => icon.name === iconName);
  return icon ? icon.color : '#000000';
};

// 각 기술에 맞는 아이콘 컴포넌트 가져오기
export const getIconComponent = (iconName: string): IconComponent => {
  // AllIcons에서 기술 이름에 맞는 아이콘 컴포넌트 찾기
  const iconComponentName = `${iconName}Icon`;
  const IconComponent = AllIcons[iconComponentName as keyof typeof AllIcons];

  // 일치하는 아이콘이 없으면 null
  return IconComponent || null;
};

// 현재 선택된 카테고리의 아이콘 가져오기
export const getIconsByCategory = (
  activeCategory: CategoryType,
): IconWithComponent[] => {
  switch (activeCategory) {
    case 'all':
      return ICON_LIST.map((icon) => ({
        ...icon,
        component: AllIcons[`${icon.name}Icon` as keyof typeof AllIcons],
      }));
    case 'frontend':
      return ICON_LIST.filter((icon) => icon.category === 'frontend').map(
        (icon) => ({
          ...icon,
          component: frontend[`${icon.name}Icon` as keyof typeof frontend],
        }),
      );
    case 'backend':
      return ICON_LIST.filter((icon) => icon.category === 'backend').map(
        (icon) => ({
          ...icon,
          component: backend[`${icon.name}Icon` as keyof typeof backend],
        }),
      );
    case 'design':
      return ICON_LIST.filter((icon) => icon.category === 'design').map(
        (icon) => ({
          ...icon,
          component: design[`${icon.name}Icon` as keyof typeof design],
        }),
      );
    default:
      return [];
  }
};

// 색상이 흰색인지 확인
export const isLightColor = (color: string): boolean => {
  return color === '#FFFFFF';
};
