const utils = new Utils('errorMessage');
const imageUsed = document.getElementById('sample').getAttribute('src')
console.log(imageUsed)
const applyButton = document.getElementById('apply')
const setUpApplyButton = function () {
    utils.loadImageToCanvas(imageUsed, 'imageInit')
    let faceCascadeFile = 'haarcascade_frontalface_default.xml';
    utils.createFileFromUrl(faceCascadeFile, faceCascadeFile, () => {
        console.log('cascade ready to load.');
        
            let src = cv.imread('imageInit');
            let gray = new cv.Mat();
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY, 0);
            let faces = new cv.RectVector();
            let faceCascade = new cv.CascadeClassifier();
            // load pre-trained classifiers
            faceCascade.load(faceCascadeFile);
            // detect faces
            let msize = new cv.Size(0, 0);
            faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);
            console.dir(faceCascadeFile)
            for (let i = 0; i < faces.size(); ++i) {
                console.log(faces)
                let roiGray = gray.roi(faces.get(i));
                let roiSrc = src.roi(faces.get(i));
                let point1 = new cv.Point(faces.get(i).x, faces.get(i).y);
                let point2 = new cv.Point(faces.get(i).x + faces.get(i).width,
                                        faces.get(i).y + faces.get(i).height);
                cv.rectangle(src, point1, point2, [255, 0, 0, 255]);
                roiGray.delete(); roiSrc.delete();
            }
            cv.imshow('imageResult', src);
            src.delete(); gray.delete(); faceCascade.delete();
            document.getElementById('imageInit').style.display = "none"
        }); 
}
applyButton.setAttribute('disabled','true')
applyButton.onclick = setUpApplyButton
utils.loadOpenCv(() => {
    
    setTimeout(function () { 
        applyButton.removeAttribute('disabled');
    },500)
});
