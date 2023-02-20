#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import prompts from 'prompts'
import minimist from 'minimist'
import { red, reset, blue, green, yellow, magenta } from 'kolorist'

const argv = minimist(process.argv.slice(2))
const cwd = process.cwd()

const argProjectName = argv._[0]
const defaultProjectName = 'scoheart-project'
const __filename = fileURLToPath(import.meta.url)
const templatesDirectory = path.join(__filename, "../..", "cli-templates")
const framework = [
    {
        name: "vanilla",
        display: "Vanilla",
        displayColor: yellow,
        variant: [
            {
                name: "vanilla-js",
                display: "JavaScript",
                displayColor: yellow
            },
            {
                name: "vanilla-ts",
                display: "TypeScript",
                displayColor: blue
            }
        ]
    },
    {
        name: "vue",
        display: "Vue",
        displayColor: green,
        variant: [
            {
                name: "vue-js",
                display: "JavaScript",
                displayColor: yellow
            },
            {
                name: "vue-ts",
                display: "TypeScript",
                displayColor: blue
            }
        ]
    },
    {
        name: "react",
        display: "React",
        displayColor: blue,
        variant: [
            {
                name: "react-js",
                display: "JavaScript",
                displayColor: yellow
            },
            {
                name: "react-ts",
                display: "TypeScript",
                displayColor: blue
            }
        ]
    },
    {
        name: "others",
        display: "Others",
        displayColor: reset,
        variant: [
            {
                name: "others-js",
                display: "JavaScript",
                displayColor: yellow
            },
            {
                name: "others-ts",
                display: "TypeScript",
                displayColor: blue
            }
        ]
    },
    {
        name: "sco-vanilla",
        display: "Sco-vanilla",
        displayColor: magenta,
        variant: null
    }
]

let projectName = argProjectName || defaultProjectName

const questions = [
    {
        type: argProjectName ? null : "text",
        name: "project",
        message: "Project name: ",
        initial: defaultProjectName,
        onState: (state) => {
            projectName = state.value
        }
    },
    {
        type: () => fs.existsSync(projectName) ? "confirm" : null,
        name: "overwrite",
        message: () => (projectName === '.'
            ? 'Current directory'
            : `Target directory "${projectName}"`) +
            ` is not empty. Remove existing files and continue?`
    },
    {
        type: (overwrite) => {
            if (overwrite === false) {
                throw new Error(red('✖') + ' Operation cancelled');
            }
            return null;
        },
        name: "overwriteChecker"
    },
    {
        type: "select",
        name: "framework",
        message: "Select a framework",
        choices: framework.map((framework) => {
            return {
                title: framework.displayColor(framework.display),
                value: framework
            }
        }),
    },
    {
        type: (framework) => framework.variant === null ? null : 'select',
        name: "variant",
        message: "Select a variant",
        choices: (framework) => framework.variant.map((variant) => {
            return {
                title: variant.displayColor(variant.display),
                value: variant
            }
        })
    }
]

    ; (async function () {
        let result
        try {
            result = await prompts(questions, {
                onCancel: () => {
                    throw new Error(red('✖') + ' Operation cancelled');
                }
            })
        } catch (error) {
            console.log(error.message)
            return
        }

        const { project, overwrite, framework, variant } = result
        const projectPath = result.project ? path.join(cwd, project) : path.join(cwd, argProjectName)
        const selectedTemplateDirectory = path.join(templatesDirectory, framework.name, variant.name)

        if (overwrite) {
            removeOldDir(projectPath)
        }

        fs.cpSync(selectedTemplateDirectory, projectPath, {
            recursive: true
        })

        console.log(`\nScaffolding project in ${projectPath}\n`)

        console.log(`\nDone. Now run:\n`);
        console.log(`  cd ${projectName}`)
        console.log(`  npm install`)
        console.log(`  npm run dev`)

    })();

function removeOldDir(oldDirPath) {
    let oldDir = fs.readdirSync(oldDirPath)
    for (let index = 0; index < oldDir.length; index++) {
        let oldFiles = path.join(oldDirPath, oldDir[index])
        let stat = fs.statSync(oldFiles)
        if (stat.isDirectory()) {
            removeOldDir(oldFiles)
        } else {
            fs.unlinkSync(oldFiles)
        }
    }
    fs.rmdirSync(oldDirPath)
}


