const Subjects = () => {
  const { data: subjects, isLoading, isError } = useGetTeacherSubjects(1)

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isExamDialogOpen, setIsExamDialogOpen] = useState(false)
  const [isQuizDialogOpen, setIsQuizDialogOpen] = useState(false)
  const [selectedSubject, setSelectedSubject] = useState(null)

  const openDeleteDialog = (subject) => {
    setSelectedSubject(subject)
    setIsDeleteDialogOpen(true)
  }

  return (
    <div className='end-part'>
      <div className='header-end-part'>
        <div>
          <h2>Your Subjects</h2>
          <span>{subjects?.length || 0}</span>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button>
              <IoEllipsisVertical className='treee' />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => setIsAddDialogOpen(true)}>
              <Plus className='w-4 h-4 mr-1' /> Add new subject
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {subjects &&
        subjects.map((subject) => (
          <div key={subject.id}>
            <div className='main-end-part-p'>
              <div className='main-end-part'>
                <div>
                  <h2>{subject.name}</h2>
                  <p>Sessions</p>
                  <span>{subject.numSessions}</span>
                </div>
                <div className='particulier'>
                  <p>Hours</p>
                  <span>{subject.totalHours}</span>
                </div>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button>
                        <IoEllipsisVertical className='treee' />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Options</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => setIsExamDialogOpen(true)}
                      >
                        <Plus className='w-4 h-4 mr-1' /> Add new exam
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => setIsQuizDialogOpen(true)}
                      >
                        <Plus className='w-4 h-4 mr-1' /> Add new quiz
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Edit className='w-4 h-4 mr-1' /> Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => openDeleteDialog(subject)}
                      >
                        <Trash className='w-4 h-4 mr-1 text-red-500' /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className='mod-end-part'>
                {subject.quizzes &&
                  subject.quizzes.map((quiz, i) => (
                    <div key={`exam-${i}`} className='mod-1'>
                      <div className='mod-1-1'>
                        <MdOutlineQuiz className='icon-mod' />
                        <div className='Info-Info'>
                          <h2>{quiz.name}</h2>
                          <p>{formatDate(quiz?.date)}</p>{' '}
                        </div>
                      </div>
                      <div>
                        <RiDeleteBinLine className='icon-mod icon-mod-delete' />
                      </div>
                    </div>
                  ))}
                {subject.upcomingExams &&
                  subject.upcomingExams.map((exam, i) => (
                    <div key={`exam-${i}`} className='mod-1'>
                      <div className='mod-1-1'>
                        <MdOutlineTask className='icon-mod' />
                        <div className='Info-Info'>
                          <h2>{exam.name}</h2>
                          <p>{formatDate(exam?.date)}</p>{' '}
                        </div>
                      </div>
                      <div>
                        <RiDeleteBinLine className='icon-mod icon-mod-delete' />
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        ))}

      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Subject</DialogTitle>
          </DialogHeader>
          <div>
            <input
              type='text'
              placeholder='Enter subject name'
              className='w-full p-2 border rounded'
            />
          </div>
          <DialogFooter>
            <Button variant='outline' onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => console.log('Adding subject...')}>
              Add
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isExamDialogOpen} onOpenChange={setIsExamDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Exam</DialogTitle>
          </DialogHeader>
          <div>
            <input
              type='text'
              placeholder='Exam Name'
              className='w-full p-2 border rounded'
            />
            <input
              type='number'
              placeholder='Duration'
              className='w-full p-2 border rounded mt-2'
            />
            <input
              type='date'
              placeholder='Due Date'
              className='w-full p-2 border rounded mt-2'
            />
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsExamDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => console.log('Adding exam...')}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isQuizDialogOpen} onOpenChange={setIsQuizDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Quiz</DialogTitle>
          </DialogHeader>
          <div>
            <input
              type='text'
              placeholder='Quiz Name'
              className='w-full p-2 border rounded'
            />
            <input
              type='date'
              placeholder='Due Date'
              className='w-full p-2 border rounded mt-2'
            />
            <Button className='mt-2'>Add Question</Button>
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsQuizDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button onClick={() => console.log('Adding quiz...')}>Add</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <div>
            Are you sure you want to delete <b>{selectedSubject?.name}</b>?
          </div>
          <DialogFooter>
            <Button
              variant='outline'
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant='destructive'
              onClick={() => console.log('Deleting subject...')}
            >
              Confirm Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
