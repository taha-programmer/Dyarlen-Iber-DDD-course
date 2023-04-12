/* eslint-disable @typescript-eslint/no-unused-vars */
import csv from 'csv';

type UserData = {
  name: string;
  email: string;
  dateOfBirth: Date;
};

// outgoing/driven port -- aka Gateway -- Uncle Bob call it: Use Case Output port
interface IExportUserData {
  export(userData: UserData): void;
}

// outgoing Adapters
class ExportUserToPDF implements IExportUserData {
  export(userData: UserData): void {
    // throw new Error('Method not implemented.');
    /* pdf package --- here we can use any package we want to deal with infrastructure...
       because now we're in the Adapter :)
    */
  }
}
class ExportUserToCSV implements IExportUserData {
  export(userData: UserData): void {
    /* csv package --- here we can use any package we want to deal with infrastructure...
       because now we're in the Adapter :)
    */
  }
}

// The code in the useCase is an Application Layer Concern, it's inside the Hexagon
// Use cases are the user-intention or user-actions on the system
class ExportUserUseCase {
  constructor(private exportUserData: IExportUserData) {}
  execute(userData: UserData): void {
    //csv.export,, if we do this, then we're depeding on Infrastructure concern, instead we'll do:
    this.exportUserData.export(userData);
  }
}

// maybe the composition root?
const exportUserToPDF = new ExportUserToPDF(); // create an instance of our Gateway Adapter
const exportUser = new ExportUserUseCase(exportUserToPDF); // Inject the Adapter in the useCase

exportUser.execute({
  name: 'Hatem',
  email: 'hatem@google.com',
  dateOfBirth: new Date(1983, 4, 12),
});
