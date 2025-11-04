import {copyFileSync, writeFileSync} from 'node:fs'
import {join} from 'node:path'
import type {Plugin} from 'vite'

export function copyPackageJsonPlugin(): Plugin {
    return {
        name: 'copy-package-json',
        closeBundle() {
            try {
                const packageJson = require('../package.json')
                const distPackageJson = {
                    name: packageJson.name,
                    version: packageJson.version,
                    main: './es/index.mjs',
                    module: './es/index.mjs',
                    types: './types/index.d.ts',
                    exports: {
                        '.': {
                            types: './types/index.d.ts',
                            import: './es/index.mjs',
                            require: './lib/index.js',
                        },
                        './es': {
                            types: './types/index.d.ts',
                            import: './es/index.mjs',
                        },
                        './lib': {
                            types: './types/index.d.ts',
                            require: './lib/index.js',
                        },
                        './es/*.mjs': {
                            types: './types/*.d.ts',
                            import: './es/*.mjs',
                        },
                        './lib/*.js': {
                            types: './types/*.d.ts',
                            require: './lib/*.js',
                        },
                        './es/*': {
                            types: [
                                './types/*.d.ts',
                                './types/index.d.ts',
                            ],
                            import: './es/*.mjs',
                        },
                        './lib/version.js': {
                            types: './types/version.d.ts',
                            require: './lib/version.js',
                        },
                        './es/version.mjs': {
                            types: [
                                './types/version.d.ts',
                            ],
                            import: './es/version.mjs',
                        },
                        './*': './*',
                    },
                    peerDependencies: packageJson.peerDependencies,
                    description: packageJson.description,
                    keywords: packageJson.keywords,
                    author: packageJson.author,
                    license: packageJson.license,
                    repository: packageJson.repository,
                    bugs: packageJson.bugs,
                    homepage: packageJson.homepage,
                }

                // 将 distPackageJson 写入 dist 目录
                writeFileSync(join(__dirname, '../dist', 'package.json'), JSON.stringify(distPackageJson, null, 2))
                console.log('package.json copied and modified successfully!')

                // 如果需要，可以复制 README.md 等其他文件到 dist 目录
                copyFileSync(join(__dirname, '../README.md'), join(__dirname, '../dist', 'README.md'))
            } catch (error) {
                console.error('Error while copying and modifying package.json:', error)
            }
        },
    }
}
