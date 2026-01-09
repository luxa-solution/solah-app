// scripts/perf-check.mjs
import {execSync} from 'child_process'
import fs from 'fs'
import path from 'path'

// Configuration - TUNE THESE FOR YOUR APP
const THRESHOLD_MB = 15  // Warn if bundle > 15MB
const EXPORT_DIR = 'dist-perf'

console.log('📦 Checking bundle size...')

// Clean previous export
if (fs.existsSync(EXPORT_DIR)) {
  fs.rmSync(EXPORT_DIR, {recursive: true})
}

try {
  // Run expo export (quiet by default)
  console.log('Running expo export...')
  execSync(`npx expo export --platform android --output-dir ${EXPORT_DIR}`, {
    stdio: 'pipe'
  })

  // Calculate total size
  let totalBytes = 0
  let fileCount = 0
  const largeFiles = []  // Files > 500KB

  function scanDir(dir) {
    const items = fs.readdirSync(dir, {withFileTypes: true})

    for (const item of items) {
      const fullPath = path.join(dir, item.name)

      if (item.isDirectory()) {
        scanDir(fullPath)
      } else {
        const stats = fs.statSync(fullPath)
        totalBytes += stats.size
        fileCount++

        // Track large files
        if (stats.size > 500 * 1024) { // 500KB
          const relativePath = path.relative(EXPORT_DIR, fullPath)
          largeFiles.push({
            name: relativePath,
            sizeMB: (stats.size / (1024 * 1024)).toFixed(2)
          })
        }
      }
    }
  }

  scanDir(EXPORT_DIR)

  // Display results
  const totalMB = totalBytes / (1024 * 1024)
  console.log(`\n📊 Results:`)
  console.log(`  Bundle size: ${totalMB.toFixed(2)} MB`)
  console.log(`  File count: ${fileCount}`)

  if (largeFiles.length > 0) {
    console.log(`\n⚠️  Large files (>500KB):`)
    largeFiles.slice(0, 5).forEach(file => {
      console.log(`  • ${file.name} (${file.sizeMB} MB)`)
    })
    if (largeFiles.length > 5) {
      console.log(`  ... and ${largeFiles.length - 5} more`)
    }
  }

  // Simple check
  if (totalMB > THRESHOLD_MB) {
    console.log(`\n❌ Bundle exceeds ${THRESHOLD_MB}MB!`)
    console.log(`   Consider: compressing images, removing unused deps`)
    process.exit(1)
  } else {
    console.log(`\n✅ Bundle size looks good (under ${THRESHOLD_MB}MB)`)
  }

} catch (error) {
  console.error('❌ Failed to check bundle size:', error.message)
  console.log('Continuing anyway...')
}