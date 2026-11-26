const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const dir = fs.mkdtempSync(path.join(os.tmpdir(),'scamshield-'));
try {
 execFileSync('tsc',['--target','ES2022','--module','commonjs','--outDir',dir,'--skipLibCheck','src/utils/messageAnalyzer.ts','src/utils/urlAnalyzer.ts','src/utils/phoneAndBank.ts'],{stdio:'inherit',shell:process.platform==='win32'});
 const {analyzeMessage}=require(path.join(dir,'messageAnalyzer.js'));
 assert.ok(analyzeMessage('Vui lòng gửi mã OTP cho nhân viên hỗ trợ để xác minh tài khoản').score>=70);
 assert.equal(analyzeMessage('Không cung cấp mã OTP cho người lạ').score,0);
 assert.equal(analyzeMessage('Mai mình gặp nhau ở trường lúc 8 giờ nhé').score,0);
 assert.ok(analyzeMessage('Việc nhẹ lương cao, nạp tiền làm nhiệm vụ, chuyển khoản đặt cọc ngay').score>=70);
 assert.equal(analyzeMessage('').score,null);
 assert.ok(analyzeMessage('Không cung cấp mã OTP cho người lạ. Vui lòng gửi mã OTP cho tôi ngay.').score>=70);
 console.log('6/6 message regression tests passed');
} finally {fs.rmSync(dir,{recursive:true,force:true});}
