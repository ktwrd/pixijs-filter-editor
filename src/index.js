const PIXI = require('pixi.js')
const ace = require('ace-builds/src-noconflict/ace')
global.$ = require('jquery')
require("ace-builds/webpack-resolver")
console.log(ace)

let aceEditor_Vertex = ace.edit('aceEditor_Vertex')
let aceEditor_Fragment = ace.edit('aceEditor_Fragment')

aceEditor_Vertex.setTheme('ace/theme/monokai')
aceEditor_Vertex.session.setMode('ace/mode/glsl')
aceEditor_Fragment.setTheme('ace/theme/monokai')
aceEditor_Fragment.session.setMode('ace/mode/glsl')

const application = new PIXI.Application({
    width: 1024,
    height: 576
})
document.getElementById("pixiViewport").appendChild(application.view)
let imageData = {
    "pcd": {
        "width": 4328,
        "height": 1578,
        "scale": 4,
        "boundingBox": {
            "min": {
                "x": 2,
                "y": 0,
                "z": 0
            },
            "max": {
                "x": 1084,
                "y": 394.73998260498047,
                "z": 60.43210220336914
            }
        },
        "boundingBoxOld": {
            "min": {
                "x": 2,
                "y": 102.68000030517578,
                "z": 0,
                "worldOrigin": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            },
            "max": {
                "x": 1084,
                "y": 497.41998291015625,
                "z": 60.43210220336914,
                "worldOrigin": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            },
            "size": {
                "x": 1082,
                "y": 394.73998260498047,
                "z": 60.43210220336914,
                "worldOrigin": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            }
        },
        "axisFlip": [
            "y"
        ],
        "path": "T047\\images"
    },
    "height": {
        "width": 4328,
        "height": 1578,
        "scale": 4,
        "boundingBox": {
            "min": {
                "x": 2,
                "y": 0,
                "z": 0
            },
            "max": {
                "x": 1084,
                "y": 394.73998260498047,
                "z": 60.43210220336914
            }
        },
        "boundingBoxOld": {
            "min": {
                "x": 2,
                "y": 102.68000030517578,
                "z": 0,
                "worldOrigin": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            },
            "max": {
                "x": 1084,
                "y": 497.41998291015625,
                "z": 60.43210220336914,
                "worldOrigin": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            },
            "size": {
                "x": 1082,
                "y": 394.73998260498047,
                "z": 60.43210220336914,
                "worldOrigin": {
                    "x": 0,
                    "y": 0,
                    "z": 0
                }
            }
        },
        "axisFlip": [
            "y"
        ],
        "path": "T047\\images",
        "floorColor": 0,
        "ceilColor": 4294967296,
        "floor": 0,
        "ceil": 60.43210220336914
    }
}
aceEditor_Fragment.setValue(PIXI.Filter.defaultFragmentSrc)
aceEditor_Vertex.setValue(PIXI.Filter.defaultVertexSrc)
let imageType = 'height'
let sprite = null
async function imageInitalize()
{
    application.stage.removeChildren()
    // let location = 'file:///media/kt/A4CAA70FCAA6DD34/Users/jyles/Desktop/Large%20Hole%20Snippet/T047/images/heightMap.png'
    // let location = 'heightMap.png'
    let location = 'https://cdn.discordapp.com/attachments/830793174544416788/963769958070911026/unknown.png'
    console.log(PIXI.Loader.shared.resources)
    let texture = await PIXI.Texture.fromURL(location, undefined, undefined, 3)
    if (sprite == null) {
        sprite = new PIXI.Sprite(texture);
        // console.log(`VERTEX: `, aceEditor_Vertex.getValue())
        // console.log(`FRAGMENT: `, aceEditor_Fragment.getValue())
        let heightMapFilter = new PIXI.Filter(aceEditor_Vertex.getValue(), aceEditor_Fragment.getValue(), {
            boundingMaxX: imageData[imageType].boundingBoxOld.max.x,
            boundingMaxY: imageData[imageType].boundingBoxOld.max.y,
            boundingMaxZ: imageData[imageType].boundingBoxOld.max.z,
            boundingMinX: imageData[imageType].boundingBoxOld.min.x,
            boundingMinY: imageData[imageType].boundingBoxOld.min.y,
            boundingMinZ: imageData[imageType].boundingBoxOld.min.z,
            imageMax: imageData[imageType].ceil,
            imageMin: imageData[imageType].floor
        })
        sprite.filters = [heightMapFilter]
        sprite.width = imageData[imageType].width
        sprite.height = imageData[imageType].height
    }
    application.stage.addChild(sprite);
}
async function updateShader() {
    if (sprite == null) return
    let vertex = aceEditor_Vertex.getValue()
    let fragment = aceEditor_Fragment.getValue()
    sprite.filters[0] = new PIXI.Filter(vertex, fragment, {
        boundingMaxX: imageData[imageType].boundingBoxOld.max.x,
        boundingMaxY: imageData[imageType].boundingBoxOld.max.y,
        boundingMaxZ: imageData[imageType].boundingBoxOld.max.z,
        boundingMinX: imageData[imageType].boundingBoxOld.min.x,
        boundingMinY: imageData[imageType].boundingBoxOld.min.y,
        boundingMinZ: imageData[imageType].boundingBoxOld.min.z,
        imageMax: imageData[imageType].ceil,
        imageMin: imageData[imageType].floor
    })
}
imageInitalize()

$("button[action=reload]").on('click', () => imageInitalize())

setInterval(() => updateShader(), 500)