export const isNotEmptyArray = (
	item: string | number | string[] | number[] | { [key: string]: unknown }[] | unknown
) => item && Array.isArray(item) && item.length > 0;
