declare namespace Express {
  interface Request {
    userId?: string
    file?: any
    files?: any
  }
}

declare module 'nodemailer-express-handlebars' {
  function nodemailerExpressHandlebars(data: any): any;

  module nodemailerExpressHandlebars { }
  export = nodemailerExpressHandlebars;
}




// declare global {
//   namespace Express{
//     interface Request {
//       userId?: string
//     }
//   }
// }
