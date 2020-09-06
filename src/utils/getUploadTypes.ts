function getProgrammingTypes(): string[] {
  return [
    'js',
    'ts',
    'tsx',
    'sqlite',
    'sql',
    'json',
    'bat',
    'c',
    'lua',
    'php',
    'pl',
    'py',
    'rb',
    'sh',
    'html',
    'css',
  ];
}

function getImageTypes(): string[] {
  return ['jpeg', 'jpg', 'png', 'svg', 'ico', 'gif'];
}

function getVideoTypes(): string[] {
  return ['avi', 'flv', 'mp4', 'mkv'];
}

function getDocumentTypes(): string[] {
  return ['docx', 'txt', 'tex', 'pdf', 'pptx'];
}

function getUploadType(type: string): string {
  if (getProgrammingTypes().includes(type)) {
    return 'programming';
  }
  if (getImageTypes().includes(type)) {
    return 'image';
  }
  if (getVideoTypes().includes(type)) {
    return 'video';
  }
  if (getDocumentTypes().includes(type)) {
    return 'document';
  }

  return 'other';
}

export {
  getProgrammingTypes,
  getImageTypes,
  getVideoTypes,
  getDocumentTypes,
  getUploadType,
};
