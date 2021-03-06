$('#rank_dropdown').dropdown();
$('#fever_dropdown').dropdown();
$('#cough_dropdown').dropdown();
$('#fatigue_dropdown').dropdown();
$('#taste_dropdown').dropdown();
$('#smell_dropdown').dropdown();
$('#diarrhea_dropdown').dropdown();
$('#contact_dropdown').dropdown();

$( "#clear_button" ).on( "click", function() {
  signaturePad.clear();
});

var canvas = document.querySelector("canvas");
var signaturePad = new SignaturePad(canvas);

console.log("1");

const {
  degrees,
  PDFDocument,
  rgb,
  StandardFonts
} = PDFLib

async function modifyPdf() {

  const url = './certificate.pdf'
  const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())
  const pdfDoc = await PDFDocument.load(existingPdfBytes)
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const pages = pdfDoc.getPages()
  const firstPage = pages[0]
  const {
    width,
    height
  } = firstPage.getSize()

  const creationInstant = new Date();
  const creationDate = creationInstant.toLocaleDateString('fr-FR');

  var lastname_input = $("#lastname_input").val();
  var firstname_input = $("#firstname_input").val();
  var unit_input = $("#unit_input").val();
  var rank_dropdown = $('#rank_dropdown').dropdown('get value');

  var fever_dropdown = $('#fever_dropdown').dropdown('get value');
  var cough_dropdown = $('#cough_dropdown').dropdown('get value');
  var fatigue_dropdown = $('#fatigue_dropdown').dropdown('get value');
  var taste_dropdown = $('#taste_dropdown').dropdown('get value');
  var smell_dropdown = $('#smell_dropdown').dropdown('get value');
  var diarrhea_dropdown = $('#diarrhea_dropdown').dropdown('get value');

  var contact_dropdown = $('#contact_dropdown').dropdown('get value');
  var text_input = $("#text_input").val();

  const signatureArrayBuffer = await fetch(signaturePad.toDataURL()).then(res => res.arrayBuffer())
  const signatureImage = await pdfDoc.embedPng(signatureArrayBuffer)
  const signatureDimensions = signatureImage.scale(1 / (signatureImage.width / 110))
  
  firstPage.drawImage(signatureImage, {
    x: 25,
    y: 85,
    width: signatureDimensions.width,
    height: signatureDimensions.height,
  })

  firstPage.drawText(creationDate, {
    x: 175,
    y: 140,
    size: 15
  })

  if (lastname_input !== null) {
    firstPage.drawText(lastname_input, {
      x: 100,
      y: 677,
      size: 15
    })
  }

  if (firstname_input !== null) {
    firstPage.drawText(firstname_input, {
      x: 100,
      y: 654,
      size: 15
    })
  }

  if (rank_dropdown !== null) {
    firstPage.drawText(rank_dropdown, {
      x: 100,
      y: 629,
      size: 15
    })
  }

  if (unit_input !== null) {
    firstPage.drawText(unit_input, {
      x: 100,
      y: 600,
      size: 15
    })
  }

  if (fever_dropdown === '1') {
    firstPage.drawText('X', {
      x: 170,
      y: 530,
      size: 15
    })
  }

  if (fever_dropdown === '0') {
    firstPage.drawText('X', {
      x: 260,
      y: 530,
      size: 15
    })
  }

  if (cough_dropdown === '1') {
    firstPage.drawText('X', {
      x: 170,
      y: 510,
      size: 15
    })
  }

  if (cough_dropdown === '0') {
    firstPage.drawText('X', {
      x: 260,
      y: 510,
      size: 15
    })
  }

  if (fatigue_dropdown === '1') {
    firstPage.drawText('X', {
      x: 170,
      y: 493,
      size: 15
    })
  }

  if (fatigue_dropdown === '0') {
    firstPage.drawText('X', {
      x: 260,
      y: 493,
      size: 15
    })
  }

  if (taste_dropdown === '1') {
    firstPage.drawText('X', {
      x: 170,
      y: 473,
      size: 15
    })
  }

  if (taste_dropdown === '0') {
    firstPage.drawText('X', {
      x: 260,
      y: 473,
      size: 15
    })
  }

  if (smell_dropdown === '1') {
    firstPage.drawText('X', {
      x: 170,
      y: 453,
      size: 15
    })
  }

  if (smell_dropdown === '0') {
    firstPage.drawText('X', {
      x: 260,
      y: 453,
      size: 15
    })
  }

  if (diarrhea_dropdown === '1') {
    firstPage.drawText('X', {
      x: 170,
      y: 433,
      size: 15
    })
  }

  if (diarrhea_dropdown === '0') {
    firstPage.drawText('X', {
      x: 260,
      y: 433,
      size: 15
    })
  }

  if (contact_dropdown === '1') {
    firstPage.drawText('X', {
      x: 22,
      y: 347,
      size: 15
    })
  }

  if (contact_dropdown === '0') {
    firstPage.drawText('X', {
      x: 80,
      y: 347,
      size: 15
    })
  }

  if (text_input !== null) {
    firstPage.drawText(text_input, {
      x: 50,
      y: 285,
      size: 15
    })
  }


  const pdfBytes = await pdfDoc.save()
  download(pdfBytes, "certificat_covid_"+lastname_input+"_"+firstname_input+".pdf");
}

