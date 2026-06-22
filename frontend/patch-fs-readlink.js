/**
 * Windows filesystem patch: on certain drives (external, backup, network),
 * fs.readlink returns EISDIR for regular files instead of EINVAL.
 * Next.js / webpack treat EINVAL as "not a symlink" and EISDIR as a fatal error.
 * This patch converts EISDIR → EINVAL so the build succeeds.
 */
const fs = require('fs');

// ── async ──────────────────────────────────────────────────────────────────
const _readlink = fs.readlink.bind(fs);
fs.readlink = function patchedReadlink(path, options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  _readlink(path, options, function (err, linkString) {
    if (err && err.code === 'EISDIR') {
      const e = Object.assign(
        new Error("EINVAL: invalid argument, readlink '" + path + "'"),
        { code: 'EINVAL', syscall: 'readlink', path }
      );
      return callback(e);
    }
    callback(err, linkString);
  });
};

// ── sync ───────────────────────────────────────────────────────────────────
const _readlinkSync = fs.readlinkSync.bind(fs);
fs.readlinkSync = function patchedReadlinkSync(path, options) {
  try {
    return _readlinkSync(path, options);
  } catch (err) {
    if (err.code === 'EISDIR') {
      throw Object.assign(
        new Error("EINVAL: invalid argument, readlink '" + path + "'"),
        { code: 'EINVAL', syscall: 'readlink', path }
      );
    }
    throw err;
  }
};

// ── promises ───────────────────────────────────────────────────────────────
const _readlinkPromise = fs.promises.readlink.bind(fs.promises);
fs.promises.readlink = async function patchedReadlinkPromise(path, options) {
  try {
    return await _readlinkPromise(path, options);
  } catch (err) {
    if (err.code === 'EISDIR') {
      throw Object.assign(
        new Error("EINVAL: invalid argument, readlink '" + path + "'"),
        { code: 'EINVAL', syscall: 'readlink', path }
      );
    }
    throw err;
  }
};
