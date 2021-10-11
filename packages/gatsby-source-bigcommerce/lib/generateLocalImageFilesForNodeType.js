const { NODE_TYPES } = require('./constants');
const generateLocalImageFile = require('./generateLocalImageFile');

const generateLocalImageFilesForNodeType = async (gatsbyAPI, nodeType) => {
  const { node } = gatsbyAPI;

  const nodeTypeToImageFileGeneratorMap = {
    [NODE_TYPES.Brand]: async () => {
      await generateLocalImageFile(gatsbyAPI, node.image_url, `image_local_file`);
    },
    [NODE_TYPES.Category]: async () => {
      await generateLocalImageFile(gatsbyAPI, node.image_url, `image_local_file`);
    },
    [NODE_TYPES.Product]: async () => {
      node.images.forEach(async (image, index) => {
        await generateLocalImageFile(gatsbyAPI, image.image_url, `images[${index}].image_local_file`);
        await generateLocalImageFile(gatsbyAPI, image.url_standard, `images[${index}].local_file_standard`);
        await generateLocalImageFile(gatsbyAPI, image.url_thumbnail, `images[${index}].local_file_thumbnail`);
        await generateLocalImageFile(gatsbyAPI, image.url_tiny, `images[${index}].local_file_tiny`);
        await generateLocalImageFile(gatsbyAPI, image.url_zoom, `images[${index}].local_file_zoom`);
      });

      node.options.forEach(async (option, index) => {
        await generateLocalImageFile(gatsbyAPI, option.image_url, `options[${index}].image_local_file`);
      });

      node.variants.forEach(async (variant, index) => {
        await generateLocalImageFile(gatsbyAPI, variant.image_url, `variants[${index}].image_local_file`);
      });
    }
  };

  const fileGenerator = nodeTypeToImageFileGeneratorMap[nodeType];

  if (!fileGenerator) return;

  await fileGenerator();
};

module.exports = generateLocalImageFilesForNodeType;
