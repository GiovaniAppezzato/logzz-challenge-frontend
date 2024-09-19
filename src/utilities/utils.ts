export function createFormData(data: Record<string, any>) {
  const formData = new FormData();

  for (const key in data) {
    if(data[key] != undefined) {
      formData.append(key, data[key]);
    }
  }

  return formData;
}

export function createQueryParams(data: Record<string, any>) {
  const params = new URLSearchParams();

  for (const key in data) {
    const value = data[key];
    if (value !== undefined && value !== '') {
      params.append(key, value);
    }
  }

  return params;
}

export const removeProp = (obj: {[key: string]: any}, prop: string, recursive: boolean = false) => {
  if (!obj.hasOwnProperty(prop)) {
    return obj;
  }

  const newObj: {[key: string]: any} = { ...obj };
  delete newObj[prop];

  if (recursive) {
    for (let key in newObj) {
      if (typeof newObj[key] === 'object' && newObj[key] !== null) {
        newObj[key] = removeProp(newObj[key], prop, recursive);
      }
    }
  }

  return newObj;
};

export const fileToBase64 = (file: File): Promise<string | null> => {
  return new Promise((resolve, reject) => {
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        resolve(reader.result as string);
      };

      reader.onerror = (error) => {
        reject(error);
      };
    } else {
      reject(new Error("No file provided"));
    }
  });
};
