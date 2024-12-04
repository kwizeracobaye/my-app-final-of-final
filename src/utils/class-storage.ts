import { ClassInfo } from '../types/class';

export function saveClass(classInfo: ClassInfo): void {
  const classes = getClasses();
  if (!classes.some(c => c.name === classInfo.name)) {
    classes.push(classInfo);
    localStorage.setItem('classes', JSON.stringify(classes));
  }
}

export function updateClass(oldName: string, newClass: ClassInfo): void {
  const classes = getClasses();
  const index = classes.findIndex(c => c.name === oldName);
  if (index !== -1) {
    classes[index] = newClass;
    localStorage.setItem('classes', JSON.stringify(classes));
  }
}

export function deleteClass(name: string): void {
  const classes = getClasses().filter(c => c.name !== name);
  localStorage.setItem('classes', JSON.stringify(classes));
}

export function getClasses(): ClassInfo[] {
  const saved = localStorage.getItem('classes');
  return saved ? JSON.parse(saved) : [];
}

export function getClassSize(className: string): number | undefined {
  const classes = getClasses();
  return classes.find(c => c.name === className)?.size;
}