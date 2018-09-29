
const { Wit, log } = require('node-wit');
const config = require('../config');

const getText = (intent = null) => {
  switch (intent) {
    case 'reject':
      return 'Sorry, have a nice day!';

    case 'more_info':
      return 'We will get back to you as soon as possible!';

    // TODO: add more text answers

    default:
      return intent;
  }
};

const getPropertyFromEntities = (entities, key, property = 'value') => {
  const entity = entities[key];

  if (entity && entity.length) {
    const data = entity[0];

    return data[property] || null;
  }

  return null;
};

/**
 * @swagger
 * definitions:
 *   Intent:
 *     type: object
 *     properties:
 *       data:
 *         type: object
 *         properties:
 *           intent:
 *             type: string
 *             example: reject
 *           text:
 *             type: string
 *             example: Sorry, have a nice day!
 *           sentiment:
 *             type: string
 *             example: neutral
 *   Error:
 *     type: object
 *     properties:
 *       error:
 *         type: object
 *         properties:
 *           status:
 *             type: number
 *             example: 404
 *           message:
 *             type: string
 *             example: Not Found!
 */

/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: Get intent by message
 *     parameters:
 *       - in: body
 *         name: query
 *         description: user message text
 *         type: string
 *         example: No, thanks!
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     responses:
 *       200:
 *         description: Returns intent object
 *         schema:
 *           $ref: '#/definitions/Intent'
 *       404:
 *         description: Returns error object
 *         schema:
 *           $ref: '#/definitions/Error'
 */
const message = async (req, res, next) => {
  try {
    const witClient = new Wit({
      accessToken: config.serverAccessToken,
      logger: new log.Logger(log.DEBUG)
    });

    const { query } = req.body;
    const witData = await witClient.message(query, {});

    let intent = null;
    let sentiment = null;

    if (witData && witData.entities) {
      intent = getPropertyFromEntities(witData.entities, 'intent');
      sentiment = getPropertyFromEntities(witData.entities, 'sentiment');
    }

    const data = {
      data: {
        id: witData.msg_id,
        intent,
        text: getText(intent),
        sentiment,
      },
    };

    res.json(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  message,
};
