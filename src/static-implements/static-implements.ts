export default function staticImplements<T>() {
  return (constructor: T) => {};
}
