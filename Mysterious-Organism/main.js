// Returns a random DNA base (A, T, C, or G)
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G'];
    return dnaBases[Math.floor(Math.random() * 4)]; 
};
  
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = [];
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase())
    };
    return newStrand;
};

// Factory function
function pAequorFactory(num, arr) {
    return {
        specimenNum: num,
        dna: arr,
        // Changes a random base of the dna and returns the modified dna strand
        mutate() {
            let bases = ['A', 'T', 'C', 'G']
            // Determines random number to use for randomly changing a base in the dna strand
            randomNum = Math.floor(Math.random() * 16);
            // Determines random number to use to determine what base will replace the old base
            randomBase = Math.floor(Math.random() * 3);
            // Assigns dna base that will be replaced to poppedBase
            let poppedBase = this.dna[randomNum];
            console.log('Random base being changed is ' + poppedBase)
            // Takes popped base out of bases so that the base cannot be replaced
            // with the same value. (EX: A being replaced with A)
            bases = bases.filter(function(base) {
                return base !== poppedBase
            })
            console.log('New base after random base popped out of bases ' + bases);
            this.dna[randomNum] = bases[randomBase];
            return this.dna;
        },

        // Compares DNA with other subject
        compareDNA(pAequor) {
            let sameDna = [];
            for (let i = 0; i < pAequor.dna.length; i++) {
                // Array of same dna bases
                // If subject1 dna === subject2 dna, add base to sameDna array
                if (pAequor.dna[i] === this.dna[i]) {
                    sameDna.push(pAequor.dna[i])
                    console.log(sameDna)
                };
            };
            // Finds percent by dividing how many bases are similar by the 
            // total number of bases in teh DNA strand
            let percentShared = ((sameDna.length / pAequor.dna.length)) * 100;
            console.log("Specimen #1 and specimen #2 have " + Math.floor(percentShared) + "% DNA in common");
        },

        // Returns true if DNA is made up of at least 60% of 'C' or 'G' bases
        willLikelySurvive() {
            let cAndG = [];
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === 'C' || this.dna[i] === 'G') {
                    cAndG.push(this.dna[i])
                };
            };
            let percentCAndG = cAndG.length / this.dna.length;
            if (percentCAndG >= .6) {
                return true;
            } else {
                return false;
            };
        }
    }
}

// Creates 30 pAequor objects and stores them in an array
const create30Strands = () => {
    let counter = 0;
    let num = 0;
    let new_arr = [];
    // While there are less than 30 subjects added to new_arr
    while (counter < 30) {
        const returnDnaBases = () => {
            const currentDnaBases = ['A', 'T', 'C', 'G'];
            return currentDnaBases[Math.floor(Math.random() * 4)]; 
        };
        const createStrand = () => {
            const newDnaStrand = [];
            for (let i = 0; i < 15; i++) {
                newDnaStrand.push(returnDnaBases())
            };
            return newDnaStrand;
        };
        // If dna strand is likely to survive, push to array and increase counter
        if ((pAequorFactory(num, createStrand())).willLikelySurvive() === true) {
            new_arr.push(pAequorFactory(num, createStrand()));
            num ++;
            counter ++;
        // If not, just increase num
        } else {
            num ++;
        }
    };
    return new_arr;
}

// Creates 30 strands of pAequor DNA that will likely survive
let testSubjects = create30Strands();
// console.log(testSubjects);

// Assigns subject1 and subject2 to first and second items of testSubjects array
let subject1 = testSubjects[0];
let subject2 = testSubjects[1];
// Modifies one base of the DNA strand and returns the modified DNA strand
console.log(subject1.mutate());
console.log(subject2.mutate());
// Compares DNA of subject 1 to subject 2
subject1.compareDNA(subject2)
// Returns true or false if the DNA is likely to survive
console.log(subject1.willLikelySurvive());
console.log(subject2.willLikelySurvive());
