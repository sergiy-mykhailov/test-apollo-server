
const { Wit, log } = require('../utils/wit');
const config = require('../config');

const getSample = (text, intent, sentiment) => {
  return [{
    text,
    entities: [
      {
        entity: 'intent',
        value: intent,
      },
      {
        entity: 'wit$sentiment',
        value: sentiment,
      }
    ]
  }];
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
const addSamples = async (req, res, next) => {
  try {
    const witClient = new Wit({
      accessToken: config.serverAccessToken,
      logger: new log.Logger(log.DEBUG)
    });

    const { text, intent, sentiment } = req.body;
    const body = getSample(text, intent, sentiment);

    const witData = await witClient.addSamples(body, witClient.config);

    const data = {
      data: {
        ...witData,
      },
    };

    res.json(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  addSamples,
};
