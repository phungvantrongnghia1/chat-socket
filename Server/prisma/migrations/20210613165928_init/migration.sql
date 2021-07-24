-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isFromSender" BOOLEAN NOT NULL DEFAULT false,
    "content" TEXT NOT NULL,
    "headerId" INTEGER NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Message" ADD FOREIGN KEY ("headerId") REFERENCES "Header"("id") ON DELETE CASCADE ON UPDATE CASCADE;
